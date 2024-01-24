import axios from "axios";
import { Component, useEffect, useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faChess } from "@fortawesome/free-solid-svg-icons";

const Icon =({nama})=>{
    if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />
    if(nama === "Cemilan") return <FontAwesomeIcon icon={faChess} className="mr-2" />

    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
}

const ListCategories = ({ changeCategory, categoriYangDipilih }) => {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:8000/kategori")
        .then(res => {
          const categories = res.data;
          setCategories(categories);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    return (
      <Col md={3} col="2" style={{marginTop:'10px'}}>
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories && categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => changeCategory(category.nama)}
              className={categoriYangDipilih === category.nama && "category-aktif"}
              style={{ cursor: 'pointer' }}
            >
              <h5><Icon nama={category.nama} /> {category.nama}</h5>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  };
  
  export default ListCategories;