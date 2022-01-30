const Delivery = require("../models/delivery.model");
const Driver = require("../models/driver.model");
const sendMail = require("../utils/mail");
const logger = require("../utils/logger");
const axios = require('axios');
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
    try {
        const result = await Delivery.find()
        if (result) {
            res.status(200).json(result)
            logger.info(`Delivery list fetched successfully by ${req.cookies.role} , id:${req.cookies.id}`);
        } else {
            res.status(400).json({ message: "No Delivery found" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
        logger.error(`${error.message}`);
    }
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
        if (!delivery || !weight || !region) return res.status(400).json({ message: "Please fill all the fields" })
        let distance = 0
        let createdBy = req.cookies.id
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
        if (parsedWeight <= 200 && region === 'national') {

            // check if there is a car driver available
            if (carDrivers.length === 0) return res.status(400).json({ error: "No car driver available" });

            // store the delivery
            await Delivery.create({ delivery, weight, from, to, distance: distance, price: price, shipmentMethod: "Car", createdBy: createdBy, region })

            // send mail to the driver who matched the shipmentMethod
            carDrivers.forEach((driver) => {
                sendMail(driver.email);

                logger.info(`Delivery is added and an email has been sent to car the drivers by ${req.cookies.role} - id:${req.cookies.id}`);

                return res.status(200).send({ message: "email has been sent to car the drivers" });
            });
        } else if (parsedWeight <= 800 && parsedWeight > 200 && region === 'national') {
            if (vanDrivers.length === 0) return res.status(400).json({ error: "No van driver available" });
            await Delivery.create({ delivery, weight, from, to, distance: distance, price: price, shipmentMethod: "Van", createdBy: createdBy, region })
            vanDrivers?.forEach((driver) => {
                sendMail(driver.email, driver.name, from, to, weight);

                logger.info(`Delivery is added and an email has been send to van the drivers by ${req.cookies.role} - id:${req.cookies.id}`);

                return res.status(200).send({ message: "email has been send to van the drivers" });
            });
        } else if (parsedWeight <= 1600 && parsedWeight > 800 && region === 'national') {
            if (truckDrivers.length === 0) return res.status(400).json({ error: "No truck driver available" });
            await Delivery.create({ delivery, weight, from, to, distance: distance, price: price, shipmentMethod: "Truck", createdBy: createdBy, region })
            truckDrivers?.forEach((driver) => {
                sendMail(driver.email, driver.name, from, to, weight);
                logger.info(`Delivery is added and an email has been send to truck the drivers by ${req.cookies.role} - id:${req.cookies.id}`);
                return res.status(200).json({ message: "email has been send to truck the drivers" });

            })

        } else {
            await Delivery.create({ delivery, weight, from: 'Morocco', to: region, price: price, shipmentMethod: "Plan", createdBy: createdBy, region  })
            return res.json({ delivery, weight })
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
        logger.info(`Delivery ${req.params.id} is deleted by ${req.cookies.role} - id:${req.cookies.id}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const AcceptDelivery = async (req, res) => {
    const deliveryId = { _id: req.params.id };
    const driverId = {_id : req.body.driverId}
    // get current authenticated driver
    // const token = await req.headers.authorization.split(" ")[1]
    // let decodeData = jwt.verify(token, `${process.env.JWT_SECRET}`)

    try {
        const delivery = await Delivery.findById(deliveryId);
        if (delivery.Available === false) return res.status(400).json({ message: "Delivery already accepted" });
        await Delivery.findByIdAndUpdate(deliveryId, {
            $set: {
                Available: false,
                AcceptedBy: driverId,
                updatedAt: Date.now()
            },
        })
        await Driver.findByIdAndUpdate(driverId,
            {
                $push: { AcceptedDeliveries: deliveryId },
            });
        logger.info(`Delivery ${req.params.id}  is Accepted by ${req.cookies.role} - id:${req.cookies.id}`);
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
        logger.info(`Delivery ${req.params.id}  is updated by ${req.cookies.role} - id:${req.cookies.id}`);
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
