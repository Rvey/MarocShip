const Driver = require("../models/driver.model");
const Delivery = require("../models/delivery.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Dayjs = require("dayjs");
const sendMail = require("../utils/mail");

const index = (req, res) => {
  Driver.find()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "No driver Found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const show = async (req, res) => {
  let id = req.params.id;
  try {
    const result = await Driver.findById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingDriver = await Driver.findOne({ email });

    if (!existingDriver)
      return res.status(400).json({ message: "Driver not found" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingDriver.password
    );

    if (!isPasswordMatch)
      return res.status(400).json({ message: "Password is incorrect" });

    const token = jwt.sign(
      { id: existingDriver._id, email: existingDriver.email },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1h" }
    );

    res.cookie('jwt', token, { httpOnly: true })
    res.cookie('role', existingDriver.role, { httpOnly: true })
    res.cookie('id', existingDriver._id, { httpOnly: true })
    
    res.status(200).json({ existingDriver, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const store = async (req, res, next) => {
  const { email, firstName, lastName, password, license } = req.body;
  try {
    if (!email || !firstName || !lastName || !password || !license)
      return res.status(400).json({ message: "Please fill all the fields" });

    const existingDriver = await Driver.findOne({ email });

    if (existingDriver)
      return res.status(400).json({ message: "Driver already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newDriver = await Driver.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
      file: req.file.filename,
      license,
    });

    const token = jwt.sign(
      { id: newDriver._id, email: newDriver.email },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1h" }
    );

    res.status(200).json({ newDriver, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const validateDriver = async (req, res, next) => {
  const { id } = req.params;
  const record = { _id: id };
  const updatedData = { ...req.body };
  try {
    const result = await Driver.findOneAndUpdate(record, updatedData, {
      new: true,
    });
    await sendMail(result.email);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const record = { _id: id };
  try {
    const result = await Driver.deleteOne(record);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const record = { _id: id };
  const updatedData = { ...req.body };
  try {
    const result = await Driver.updateOne(record, updatedData, {
      new: true,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const driverBonus = async (req, res) => {
  const { driverId } = req.params.id;
  try {
    // find driver by id
    const driver = await Driver.findOne(driverId);

    let allDeliveries = [];
    let totalTraveledDistance = 0
    let deliveryDate;
    let price = 0
    let bonus = 0
    const currentMonth = Dayjs().format("MM");
    // find all deliveries made by this driver
    await Promise.all(driver.AcceptedDeliveries.map(async (deliveryId) => {
      const deliveries = await Delivery.findById({ _id: deliveryId })
      // get only deliveries made in current month
      if (Dayjs(deliveries.createdAt).format("MM") === currentMonth ) 
      allDeliveries.push(deliveries)
    }));

    // update total traveled distance and price
    allDeliveries.map(delivery => {
      totalTraveledDistance += delivery.distance + 1000
      price += delivery.price
    })


    // set monthly bonus depending on the total traveled distance
    if (totalTraveledDistance === 1000) {
      bonus = price * 15 / 100
      const result = await Driver.updateOne({ driverId }, { bonus: bonus }, {
        new: true,
      });
      res.json({ result, bonus })
    } else if (totalTraveledDistance > 1000 && totalTraveledDistance <= 2000) {
      bonus = price * 22 / 100
      const result = await Driver.updateOne({ driverId }, { bonus: bonus }, {
        new: true,
      });
      res.json({ result, bonus })
    } else if (totalTraveledDistance > 2000 && totalTraveledDistance <= 2500) {
      bonus = price * 30 / 100
      const result = await Driver.updateOne({ driverId }, { bonus: bonus }, {
        new: true,
      });
      res.json({ result, bonus })
    }

    res.status(200).json({ allDeliveries, totalTraveledDistance, price, bonus, deliveryDate , currentMonth});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  index,
  show,
  store,
  loginDriver,
  destroy,
  validateDriver,
  driverBonus,
  update,
};
