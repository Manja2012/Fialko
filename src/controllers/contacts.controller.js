import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";
import {env} from '../config.js'

const transport = nodemailer.createTransport({
  host: env.mailHost,
  port: env.mailPort,
  secure: false,
  auth: {
    user: env.mailUser,
    pass: env.mailPassword,
  },
});

export const addContact = async (req, res) => {
  try {
    console.log(req.body)
    const contact = await Contact.create(req.body);

    await transport.sendMail({
      from: env.mailUser, 
      to: "mdemko2012@gmail.com",
      subject: "Nouvelle prise de contact via le site",
      text: "Hello world?", 
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
        if (!getContact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        if (parseInt(getContact.id) == parseInt(req.user.id)) {
            const contact = await Contact.findByIdAndDelete(req.params.id);
            res.status(200).json("Contact deleted ! ");
        } else {
            return res.status(403).json({ error: "Seul le créateur peut supprimer !" });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};
