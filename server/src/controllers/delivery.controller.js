const Delivery = require("../models/delivery.model");
const Driver = require("../models/driver.model");
const NodeGeocoder = require("node-geocoder");
const sendMail = require("../utils/mail");
const axios = require('axios');
const index = async (req, res) => {
    Delivery.find()
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: "No delivery Found" });
            }
        })
        .catch((err) => {
            res.status(404).json({ error : err.message });
        });
 

};

const show = async (req, res) => {
    let id = req.params.id;
    try {
        const result = await Delivery.findById(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

const store = async (req, res) => {
    const { delivery, weight, from, to, shipmentMethod, region } = req.body;
    try {
        // if (!delivery || !weight || !from || !to || !shipmentMethod || !region) return res.status(400).json({ message: "Please fill all the fields" })
        let distance = '100'
        let createdBy = '61e4808f735f6f5a37b2fa3b'
        let price = 0

        // calculate distance
        const getDistance = await axios(`https://www.distance24.org/route.json?stops=${from}%7C${to}`)

        distance = getDistance.data.distance.toFixed(2)

        // calculate price based on weight
        const parsedWeight = parseInt(req.body.weight);

        if (region === 'national') {
            if (parsedWeight <= 3) {
                price = parsedWeight * 40
            } else if (parsedWeight > 3) {
                price = (parsedWeight - 3) * 5 + 120

            }
        } else if (region === 'Europe') {
            price = parsedWeight * 160
        } else if (region === 'Asia') {
            price = parsedWeight * 200
        } else if (region === 'Australia') {
            price = parsedWeight * 260
        } else if (region === 'America') {
            price = parsedWeight * 220
        }


        // find drivers
        const drivers = await Driver.find();

        const carDrivers = drivers.filter((driver) => {
            return driver.license === "car";
        });
        const vanDrivers = drivers.filter((driver) => {
            return driver.license === "van";
        });
        const truckDrivers = drivers.filter((driver) => {
            return driver.license === "truck" && driver.verified === true;
        });

        // check the weight of the shipment and send mail to the driver accordingly
        if (parsedWeight <= 200) {
           
            // check if there is a car driver available
            if (carDrivers.length === 0) return res.status(400).json({ error: "No car driver available" });
            
            // store the delivery
            await Delivery.create({ delivery, weight, from, to, distance: distance, price: price, shipmentMethod: "Car", createdBy: createdBy, region })
          
            // send mail to the driver who matched the shipmentMethod
            carDrivers.forEach((driver) => {
                sendMail(driver.email);
                return res.status(200).send({ message: "email has been send to truck the drivers" });
            });
        } else if (parsedWeight <= 800 && parsedWeight > 200) {
            if (vanDrivers.length === 0) return res.status(400).json({ error: "No van driver available" });
            await Delivery.create({ delivery, weight, from, to, distance: distance, price: price, shipmentMethod: "Van", createdBy: createdBy, region })
            vanDrivers?.forEach((driver) => {
                sendMail(driver.email, driver.name, from, to, weight);
                return res.status(200).send({ message: "email has been send to truck the drivers" });
            });
        } else if (parsedWeight <= 1600 && parsedWeight > 800) {
            if (truckDrivers.length === 0) return res.status(400).json({ error: "No truck driver available" });
            await Delivery.create({ delivery, weight, from, to, distance: distance, price: price, shipmentMethod: "Truck", createdBy: createdBy, region })
            truckDrivers?.forEach((driver) => {
                sendMail(driver.email, driver.name, from, to, weight);
                return res.status(200).json({ message: "email has been send to truck the drivers" });
            });
        } else {
            res.status(200).json({ error: "A problem occurred" });
        }

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    const record = { _id: id };
    try {
        const result = await Delivery.deleteOne(record);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const AcceptDelivery = async (req, res) => {
    const deliveryId = { _id: req.params.id };

    // get current authenticated driver
    const token = await req.headers.authorization.split(" ")[1]
    let decodeData = jwt.verify(token, `${process.env.JWT_SECRET}`)

    try {
        const delivery = await Delivery.findById(deliveryId);
        if (delivery.Available === false) return res.status(400).json({ message: "Delivery already accepted" });
        await Delivery.findByIdAndUpdate(deliveryId, {
            $set: {
                Available: false,
                AcceptedBy: decodeData.id,
                updatedAt : Date.now()
            },
        })
        await Driver.findByIdAndUpdate({ _id: decodeData.id },
            {
                $push: { AcceptedDeliveries: deliveryId },
            });
        return res.status(200).json({ message: "delivery has been accepted" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const record = { _id: id };
    const updatedData = { ...req.body };
    try {
        const result = await Delivery.updateOne(record, updatedData);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    index,
    show,
    store,
    AcceptDelivery,
    destroy,
    update,
};
