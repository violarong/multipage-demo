/**
 * ------------------------------------------------------------
 * Fetch
 * @author capasky
 * ------------------------------------------------------------
 */
'use strict';

import isObject from 'lodash/isObject';
import isPlainObject from 'lodash/isPlainObject';

function serialize(obj) {
    return Object.keys(obj).map(name => {
        return `${name}=${obj[name]}`;
    }).join('&');
}

function appendQuery(url, query) {
    if (isObject(query)) {
        query = serialize(query);
    }
}

function jsonFetch(url, options = {}) {
    let isJson = isPlainObject(options.data);
    let opt = {
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json'
        }
    };
    if (isJson) {
        opt.headers['Content-Type']='application/json'
    }
    opt.method = (options.method || 'GET').toUpperCase();
    if (options.data && isJson) {
        switch (opt.method) {
            case 'GET':
                url += '?' + serialize(options.data);
                break;
            case 'POST':
            case 'PUT':
            case 'DELETE':
                opt.body = JSON.stringify(options.data);
                break;
            default:
                opt.body = options.data;
                break;
        }
    } else {
        opt.body = options.data;
    }
    return fetch(url, opt)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
                throw new Error(res.status);
            }
        })
        .then(json => {
            if (!json.success) {
                let error = joinErrors(json.errors)
                error && console.error(error);
                throw new Error(error);
            } else {
                return json.result;
            }
        })
        .catch(ex => {
            console.log('jsonFetch failed', ex);
        });
};

export function joinErrors(errors) {
    if (!errors) {
        return '';
    }
    let errorsText = [];
    errorsText = errors.map(err => {
        let cerr = [];
        for (let name in err) {
            if (err.hasOwnProperty(name)) {
                cerr.push(`${err[name]}, Code: ${name}`);
            }
        }
        return cerr.join('\n');
    });
    return errorsText.join('\n');
}

export function get(url, data, timestamp = false) {
    if (timestamp) {
        data = data || {};
        data.timestamp = +new Date();
    }
    return jsonFetch(url, {
        method: 'GET',
        data: data
    });
};

export function post(url, data) {
    return jsonFetch(url, {
        method: 'POST',
        data: data
    });
};

export function del(url, data) {
    return jsonFetch(url, {
        method: 'DELETE',
        data: data
    });
};

export function put(url, data) {
    return jsonFetch(url, {
        method: 'PUT',
        data: data
    });
};
