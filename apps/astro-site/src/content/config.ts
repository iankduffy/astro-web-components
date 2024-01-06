import { z, defineCollection } from "astro:content";

const webComponentsCollection = defineCollection({ 
    type: 'content'
})

export const collections = {
    'web-components': webComponentsCollection,   
};