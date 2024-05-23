import Reservation from '../models/reservation.model.js'; 

export const addReservation = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body)
        res.status(201).json(reservation)
    } catch (error) {
        res.status(500).json({ error: "Erreur" })
    }
}

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
        res.status(200).json(reservations)
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const getByIdReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = await Reservation.findById(id)
        res.status(200).json(reservation)
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const updateByIdReservation = async (req, res) => {
    try {
        const getReservation = await Reservation.findById(req.params.id);

        if (!getReservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        if (parseInt(getReservation.id) == parseInt(req.user.id)) {
           
            const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.status(200).json(reservation)
        } else {
            return res.status(403).json({ error: "Seul le créateur peut modifier !" })
        }
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}


export const deleteByIdReservation = async (req, res) => {
    try {
        const getReservation = await Reservation.findById(req.params.id);
        
        if (!getReservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }

        if (parseInt(getReservation.id) == parseInt(req.user.id)) {
                
            const reservation = await Reservation.findByIdAndDelete(req.params.id);
            res.status(200).json("Reservation deleted ! ");
        } else {
            return res.status(403).json({ error: "Seul le créateur peut supprimer !" });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};