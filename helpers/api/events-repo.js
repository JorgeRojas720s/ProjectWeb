import getConfig from 'next/config';
import { db } from '/helpers/api';

const { serverRuntimeConfig } = getConfig();

export const eventsRepo = {

    create,
};

async function create(params) {

    
    console.log("🫥 ~ create ~ params:", params)
    
   
    const event = new db.tbl_events(params);
    console.log("🐖 ~ create ~ event:", event)
    

    // save user
    await event.save();
}