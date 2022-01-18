const Delivery = require("../models/delivery.model");
const Driver = require("../models/driver.model");
const NodeGeocoder = require("node-geocoder");
const sendMail = require("../utils/mail");

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
            console.log(err);
        });
};

const show = async (req, res) => {
    let id = req.params.id;
    try {
        const result = await Delivery.findById(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const store = async (req, res) => {
    const { delivery, weight, from, to, shipmentMethod, region } = req.body;
    try {
        // if (!delivery || !weight || !from || !to || !shipmentMethod || !region) return res.status(400).json({ message: "Please fill all the fields" })
        let distance = '100'
        let createdBy = '61e4808f735f6f5a37b2fa3b'
        let price = '100'

        const Nw = parseInt(req.body.weight);

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

        if (Nw <= 200) {
            if (carDrivers.length === 0)  return res.status(400).json({ error: "No car driver available" });
            await Delivery.create({ delivery, weight, from, to, distance: distance, price:price, shipmentMethod: "Car", createdBy:createdBy, region })
            carDrivers.forEach((driver) => {
                sendMail(driver.email);
                return res.status(200).send({ message: "email has been send to truck the drivers" });
            });
        } else if (Nw <= 800) {
            if (vanDrivers.length === 0) return res.status(400).json({ error: "No van driver available" });
            await Delivery.create({ delivery, weight, from, to, distance: distance, price:price, shipmentMethod: "Van", createdBy:createdBy, region })
            vanDrivers?.forEach((driver) => {
                sendMail(driver.email);
                return res.status(200).send({ message: "email has been send to truck the drivers" });
            });
        } else if (Nw <= 1600) {
            if (truckDrivers.length === 0) return res.status(400).json({ error: "No truck driver available" });
            await Delivery.create({ delivery, weight, from, to, distance: distance, price:price, shipmentMethod: "Truck", createdBy:createdBy, region })
            truckDrivers?.forEach((driver) => {
                sendMail(driver.email);
                return res.status(200).json({ message: "email has been send to truck the drivers" });
            });
        } else {
            res.status(200).json({ error: "A problem occurred" });
        }

        // const newDelivery = await Delivery.create({ delivery, weight, from, to, distance: distance, price:price, shipmentMethod, createdBy:createdBy, region })

        // res.status(200).json(newDelivery)
        // res.status(200).json(Nw)
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    const record = { _id: id };
    try {
        const result = await Delivery.deleteOne(record);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
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
        res.status(400).json({ message: err });
    }
};

module.exports = {
    index,
    show,
    store,
    destroy,
    update,
};
