const fs = require('fs');

const JSONWrite = (filePath, data, encoding = 'utf-8') => {
    const promiseCallBack = (resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), encoding, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    };
    return new Promise(promiseCallBack);
};

JSONWrite('./teste4.json', {id:2, name:'Pedro Resende de Almeida'}).then(console.log).catch(console.error);

const JSONRead = (filePath, encoding = 'utf-8') => {
    const promiseCallBack = (resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if(err) {
                reject(err);
                return;
            }
            try {
                const object = JSON.parse(data);
                resolve(object);
            } catch (e) {
                reject(err);
            }
        });
    };
    return new Promise(promiseCallBack);
};

JSONRead('./user.json').then(console.log).catch(console.error);

const JSONUpdate = (filePath, newData, encoding = 'utf-8') => {
    const promiseCallBack = async (resolve, reject) => {
        const data = JSONRead(filePath, encoding);
        const result = {...data, ...newData}
        await JSONWrite(filePath, result, encoding);
        resolve(result);
        try {

        } catch (e){
            reject(e);
        };
    };
    return new Promise(promiseCallBack);
};

JSONUpdate('./teste4.json', {id:1, name:'Pedro Resende de Almeida'}).then(console.log).catch(console.error);

const JSONDelete = (filePath) => {
    const promiseCallBack = (resolve, reject) => {
        fs.unlink(filePath, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    };
    return new Promise(promiseCallBack);
};

JSONDelete('./teste3.json').then(console.log).catch(console.log);


// 1ª Forma
// const user = require('./user.json');
// console.log(user);

// 2ª Forma
// fs.readFile('./user.json', 'utf-8', (error, data) => { 
//     if (error) {
//         console.log(error);
//         return;
//     }
//     try {
//         const user = JSON.parse(data);
//         console.log(user);
//         } catch (e) {
//             console.log(e);
//         }   
// });

// 3ª Forma
// try {
//     const data = fs.readFileSync('./user.json', 'utf-8');
//     const user = JSON.parse(data);
//     console.log(user);
// } catch (e) {
//     console.log(e);
// }

// const data = {
//     "id": 1,
//     "name": "Pedro Resende",
//     "cidade": "Belo Horizonte",
//     "idade": "26"
// }

// fs.writeFile('./teste.json', JSON.stringify(data, ['name', 'cidade'], 4), 'utf-8', (error, result) => {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     console.log(result);
// });

// try {
//     const dataString = JSON.stringify(data, ['name'], 2);
//     const result = fs.writeFileSync('./teste2.json', dataString, 'utf-8');
//     console.log(result);
// } catch (e) {
//     console.log(e);
// }

// const updateFile = (filePath, updateDate, encoding = 'utf-8') => {
//     const dataString = fs.readFileSync(filePath, fileEnconding);
//     const dataObject = JSON.parse(dataString);
//     const newData = {...dataObject, ...updateDate};
//     const userString = JSON.stringify(newData, null, 2)
//     fs.writeFileSync(filePath, userString, fileEnconding);
// }

// const filePath = './teste3.json';
// const fileEnconding = 'utf-8';

// const data = {
//     name: 'Pedro Almeida',
//     programmingLanguages: ['Java Script', 'Python']
// };

// updateFile(filePath, data, fileEnconding);