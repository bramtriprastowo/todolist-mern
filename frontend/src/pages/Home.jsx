import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Category from "../components/Category";
import styles from "./Home.module.css";

const Home = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + "/todos?id=" + id)
      .then((response) => setData(response.data.data))
      .catch((error) => console.log(error));
    return () => {};
  }, [id]);

  return (
    <Fragment>
      <div className={`d-flex ${styles.home}`}>
        <aside>
          <svg className={`${styles.svg1}`}></svg>
          <div className={`${styles.categories}`}>
            <h5 className="mb-5">All Tasks</h5>
            {data.length > 0 ? (
              data.map((datum, index) => {
                return (
                  <p key={index}>{datum.category}</p>
                )
              })
            ) : <p></p>}
            <p className={`${styles.newCategory}`}>+ New category</p>
          </div>
        </aside>
        <main className="w-100">
          <div className={`${styles.tasks}`}>
            <h5>All Tasks</h5>
            <input
              type="text"
              className={`form-control ${styles.input}`}
              id="todos"
              placeholder="Add a new task"
            />
            {data.length > 0 ? (
              data.map((datum, index) => {
                return (
                  <p key={index}>
                    <i
                      className={
                        `fa ` +
                        (datum.title
                          ? `fa-square-o ${styles.notChecked}`
                          : `fa-check-square-o ${styles.checked}`)
                      }
                      aria-hidden="true"
                    ></i>{" "}
                    {datum.title}{" "}  
                    <Category categoryName={datum.category} />
                  </p>
                );
              })
            ) : (
              <p>Data tidak ditemukan</p>
            )}
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default Home;
