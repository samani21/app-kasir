import React, { Component, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/constant'
import axios from 'axios'

const Sukses = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "keranjangs");
        const keranjangs = response.data;

        await Promise.all(
          keranjangs.map(async (item) => {
            await axios.delete(API_URL + "keranjangs/" + item.id);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='mt-4 text-center'>
      <h2>Sukses</h2>
      <p>Terimakasih Sudah Memesan!</p>
      <Button variant='primary' as={Link} to='/'>
        Kembali
      </Button>
    </div>
  );
};

export default Sukses;