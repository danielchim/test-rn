import React, { useEffect, useState } from 'react';

// some apis need an auth key
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjc2LCJsb2dpbk1ldGhvZCI6InRlc3QiLCJyb2xlIjoiVU5QQUlEIiwiaWF0IjoxNjE3MDc2NzUzfQ.EDvdEqR2OvlL8X2hzc40-mXL0ZsqGpWwR0GJAmotsOo";

const getAPI = {
    getCategories: async (type) => {
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${apikey}`,
                'Content-Type': 'application/json'
            }),
            body:JSON.stringify({ mode: type })
        }
        try {
            const response = await fetch("http://128.199.197.6:3000/vocab/topic/get", requestOptions);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    getTopicVocabs: async (id, pages)=> {
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${apikey}`,
                'Content-Type': 'application/json'
            }),
            body:JSON.stringify({ topicId: id,page: pages })
        }
        try {
            const response = await fetch("http://128.199.197.6:3000/vocab/vocab/get", requestOptions);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    insertVocabs: async (topicObj)=> {
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${apikey}`,
                'Content-Type': 'application/json'
            }),
            body:JSON.stringify({ vocabs: topicObj })
        }
        try {
            const response = await fetch("http://128.199.197.6:3000/vocab/practice/insert", requestOptions);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}

export default getAPI;