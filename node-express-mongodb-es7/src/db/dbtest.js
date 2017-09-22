import {
    createDb,
    createUserModule,
} from './dbmanager';
import {
    warn,
} from '../util/debug';


const db = createDb();
const User = createUserModule(db);

export function insert(userName, password) {
    return new Promise((resolve) => {
        const userObj = new User({ name: userName, password });

        userObj.save((err, res) => {
            if (err) {
                warn(`Inset Error:${err}`);
                // 如果reject了，会抛出错误，因此暂时先resolve
                resolve({
                    error: err,
                });
            } else {
                warn(`Inset Success:${res}`);
                resolve({
                    res,
                });
            }
        });
    });
}

export function getByConditions(userName) {
    return new Promise((resolve) => {
        const wherestr = { name: userName };
    
        User.find(wherestr, (err, res) => {
            if (err) {
                warn(`Get Error:${err}`);
                // 如果reject了，会抛出错误，因此暂时先resolve
                resolve({
                    error: err,
                });
            } else {
                warn(`Get Res:${res}`);
                resolve({
                    res,
                });
            }
        });
    });
}