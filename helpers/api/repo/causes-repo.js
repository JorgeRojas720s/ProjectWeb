import getConfig from 'next/config';
import { db } from '/helpers/api';

const { serverRuntimeConfig } = getConfig();

export const causesRepo = {
    getAll
    // getById,
    // getAll,
    // create,
    // update,
    // _delete,
};

async function getAll(params){
    return await db.tbl_causes.findAll();
}
