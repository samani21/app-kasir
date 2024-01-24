import { Col, Container, Row } from 'react-bootstrap';
import { Hasil, ListCategories, Menus } from '../components';
import React, { Component, useEffect, useState } from 'react'
import { API_URL } from '../utils/constant';
import axios from 'axios';
import swal from 'sweetalert';

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [categoriYangDipilih, setCategoriYangDipilih] = useState('Makanan');
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    // axios.get(API_URL + "products?category.nama=" + categoriYangDipilih)
    axios.get("http://localhost:8000/product?nama=" + categoriYangDipilih)
      .then(res => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch(error => {
        console.log(error);
      });

    getListKeranjang();
  }, [categoriYangDipilih]);

  const getListKeranjang = () => {
    axios.get("http://localhost:8000/keranjang")
      .then(res => {
        const keranjangs = res.data;
        setKeranjangs(keranjangs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeCategory = (value) => {
    setCategoriYangDipilih(value);
    setMenus([]);

    axios.get("http://localhost:8000/product?nama=" + value)
      .then(res => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const masukKeranjang = (value) => {
    axios.get("http://localhost:8000/keranjang/update?id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            id_product: value.id,
            product: value
          };
          axios.post("http://localhost:8000/keranjang/store", keranjang)
            .then((res) => {
              getListKeranjang();
              swal({
                title: "Success Masuk Keranjang",
                text: "Success Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga:  value.harga * (res.data[0].jumlah + 1),
            product: value
          };
          axios.put("http://localhost:8000/keranjang/update/" + value.id, keranjang)
            .then((res) => {
              
              getListKeranjang();
              swal({
                title: "Success Masuk Keranjang",
                text: "Success Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500
              });
            })
            .catch(error => {
              console.log(error);
            });
            console.log("dsaasd",res.data[0].id)
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='mt-3'>
      <Container fluid>
        <Row>
          <ListCategories changeCategory={changeCategory} categoriYangDipilih={categoriYangDipilih} />
          <Col style={{marginTop: '10px'}}>
            <h4>
              <strong>Daftar Produk</strong>
            </h4>
            <hr />
            <Row className='overflow-auto menu'>
              {menus && menus.map((menu) => (
                <Menus
                  key={menu.id}
                  menu={menu}
                  masukKeranjang={masukKeranjang}
                />
              ))}
            </Row>
          </Col>
          <Hasil keranjangs={keranjangs} getListKeranjang={getListKeranjang} />
        </Row>
      </Container>
    </div>
  );
};

export default Home;