import "babel-polyfill";
import github from 'octonode';
import inquirer from 'inquirer';
import fs from 'fs';
import {
    readToken,
    getBody
} from './codigo';

const organizacion = async(repo) => {

    if (!fs.existsSync(process.env.HOME + '/.automatizacion-para-vagos/token.json')) {
        console.log(' ');
        console.log('Todavía no ha generado su token, primero ejecute automatizacion-vagos -i | --init');
        console.log(' ');
        console.log('Para mas información, ejecute automatizacion-vagos -h');
        console.log(' ');
    } else {
        let token = readToken();
        await getOrganizacion(token);
    }
}

function getOrganizacion(token) {

    return new Promise((resolve, reject) => {

        let client = github.client(token);
        let ghme = client.me();

        ghme.orgs((err, org) => {
            if (err) console.log("Error: " + err.statusCode + ": " + err.message);
            try {
                for (let i = 0; i < org.length; i++) {
                    console.log("Organización: " + org[i].login);
                    console.log("|-------------> Descripción: " + org[i].description);
                }
                console.log(" ");
            } catch (e) {
              console.log("No pertenece a ninguna organización.")
            }

        });
    });
}

export {
    organizacion
};
