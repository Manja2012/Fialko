import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";
// import {env} from '../config.js'

// nodemail

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "biomir.vet@gmail.com",
    pass: "fhcxwakwkduyhacj",
  },
});

export const addContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    await transport.sendMail({
      from: "biomir.vet@gmail.com", // sender address
      to: "mdemko2012@gmail.com", // list of receivers
      subject: "Nouvelle prise de contact via le site", // Subject line
      text: "Hello world?", // plain text body
      html: `
                <ul>
                    <li>Nom : ${contact.name}</li>
                    <li>Numéro de téléphone : ${contact.phone}</li>
                    <li>Email : ${contact.email}</li>
                    <li>Message : ${contact.message}</li>
                </ul>
            `,
    });

    res.status(201).json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erreur lors de l'envois",
      trace: err,
    });
  }
};

// get

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};

// getById

export const getByIdContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};

// deleteById

export const deleteByIdContact = async (req, res) => {
  try {
    const getContact = await Contact.findById(req.params.id);
    if (getContact.user.toString() === req.user.id) {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      res.status(200).json("Contact deleted ! ");
    } else {
      return res
        .status(403)
        .json({ error: "Seul le créateur peut supprimer !" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};
