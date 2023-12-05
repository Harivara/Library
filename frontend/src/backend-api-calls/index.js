// BackendApi.js
import bookApi from './book';
import userApi from './user';

const BackendApi = {
    book: bookApi,
    user: userApi
};

export default BackendApi;

