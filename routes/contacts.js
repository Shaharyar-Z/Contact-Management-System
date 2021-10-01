const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth')

const User = require('../models/User')
const Contact = require('../models/Contact');
const { response } = require('express');



//  @route  GET api/contacts
//  @desc   Get all users contacts
//  @access Private

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1
        })
        res.json(contacts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

//  @route  POST api/contacts
//  @desc   Add a new user
//  @access Private

router.post('/', [auth, [
    check('name','Name is required').not().isEmpty(),
]],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const { name, email, phone, type } = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id 
        });

        const contact = await newContact.save();

        res.json(contact)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

//  @route  PUT api/contacts/:id
//  @desc   Update a contact
//  @access Private

router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
    
    const contactFields = {};

    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        // Check if the contact exists
        if (!contact) return res.status(404).send({ msg: "This contact doesn't exist." });

        // if the contact exists, then make sure currently signed in user own the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You do not have the authorization to update this contact.' });
        }
        // update contact if above condition pass
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true }
        );
        // return the update contact
        res.json(contact)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    };
});

//  @route  DELETE api/contacts/:id
//  @desc   Delete a contact
//  @access Private

router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        // Check if the contact exists
        if (!contact) return res.status(404).send({ msg: "This contact doesn't exist." });

        // if the contact exists, then make sure currently signed in user own the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You do not have the authorization to update this contact.' });
        }
        // Find and remove the contect from mongodb
        await Contact.findByIdAndRemove(req.params.id);

        // return the confirmation message
        res.json({ msg: "This contact has been removed." })
        res.json(contact)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    };
});

module.exports = router;