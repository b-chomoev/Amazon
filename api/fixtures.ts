import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import {Product} from "./models/Product";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('products');
        await db.dropCollection('users');
    } catch (error) {
        console.log('Skipping drop...');
    }

    const firstUser = await User.create({
        username: 'admin',
        password: 'admin',
        displayname: 'Admin',
        phone: '+996 555 555 555',
        token: randomUUID(),
    });

    const secondUser = await User.create({
        username: 'user',
        password: 'user',
        displayname: 'User',
        phone: '+996 777 777 777',
        token: randomUUID(),
    });

    await Product.create({
        title: 'Calendar',
        description: '2025 year calendar',
        category: 'Kids',
        price: 10,
        image: 'fixtures/calendar.png',
        seller: firstUser,
    }, {
        title: 'Notebook',
        description: 'A notebook for your notes',
        category: 'Teenager',
        price: 5,
        image: 'fixtures/notebook.png',
        seller: secondUser,
    }, {
        title: 'Calendar',
        description: '2025 year calendar',
        category: 'Kids',
        price: 10,
        image: 'fixtures/calendar.png',
        seller: firstUser,
    }, {
        title: 'Notebook',
        description: 'A notebook for your notes',
        category: 'Teenager',
        price: 5,
        image: 'fixtures/notebook.png',
        seller: secondUser,
    });

    await db.close();
};

void run();