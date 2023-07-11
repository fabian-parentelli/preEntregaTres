import TicketRepository from '../repsitories/tickets.repository.js';
import { v4 as uuidv4 } from 'uuid';

const ticketRepository = new TicketRepository();

const save = async (amount, user) => {

    const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),

    };
};

export { save };