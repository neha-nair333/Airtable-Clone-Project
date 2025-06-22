import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTZhOWEyYjMwNThlNjljYjliZDY5OSIsImlhdCI6MTc1MDU4NDk5NywiZXhwIjoxNzUwNTkyMTk3fQ.S9-jDh5MUZ7PgWfdwGRNBhFsqhX8BSxJSfuXExU3Gfk';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
