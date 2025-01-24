import Address from "../models/address";

export const newAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    console.log(address);
    res.status(201).json({ address });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create new address" });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({ addresses });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
};
