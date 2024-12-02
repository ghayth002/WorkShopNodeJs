var Contact = require('../models/contact')
var router = require('express').Router();

// List all contacts
router.get('/', async function(req, res, next) {
    try {
        const contacts = await Contact.find();
        res.render('form.twig', { 
            title: "Contact list", 
            cont: contacts 
        });
    } catch (err) {
        next(err);
    }
});


// Add new contact
router.post('/', async function(req, res, next) {
    try {
        const newContact = new Contact({
            FullName: req.body.FullName,
            Phone: req.body.Phone
        });
        await newContact.save();
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

// Show edit form
router.get('/:id/edit', async function(req, res, next) {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.redirect('/');
        }
        res.render('edit.twig', { contact: contact });
    } catch (err) {
        next(err);
    }
});

// Update contact
router.post('/:id/edit', async function(req, res, next) {
    try {
        await Contact.findByIdAndUpdate(req.params.id, {
            FullName: req.body.FullName,
            Phone: req.body.Phone
        });
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

// Delete contact
router.post('/:id/delete', async function(req, res, next) {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

module.exports = router;