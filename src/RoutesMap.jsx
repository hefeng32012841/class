import Test from './views/test';
import SortClass from './views/sortClass';

const links = [
    {
        name: 'test',
        to: '/test'
    },
    {
        name: 'sortClass',
        to: '/sortClass'
    }
];

const routes = [
    {
        path: '/test',
        component: Test
    },
    {
        path: '/sortClass',
        component: SortClass
    }
];

export default {
    links,
    routes
}