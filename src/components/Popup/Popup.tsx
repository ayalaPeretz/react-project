import React, { FC, useEffect, useRef, useState } from 'react';
import './Popup.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dropdown, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryItem, remuveCategory, updateCategory } from '../../redux/slices/categorySlice';
import { openModal } from '../../redux/slices/massegeSlice';
import { Item } from '../../models/Item.model';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { useFormik } from 'formik';

interface PopupProps {
  show: boolean
  onHide: () => void;
  display: number
  title: string
  clickP: string
  item?: Item
}

const Popup = (props: PopupProps) => {
  //מערך קטגוריות מובילות מהסטייט הגלובלי
  const categories = useSelector((store: any) => store.categorySlice.arrayName);
  const _dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<any>(categories[0]);
  const [newCategory, setNewCategory] = useState<any>('');
  const [imageFile, setImageFile] = useState<any | null>(null);
  const [pText, setPtext] = useState<any>('');


  // useEffect(() => {
  //   if (props.clickP === "עדכון" && props.item) {
  //     setImageFile(props.item.src);
  //     setPtext(props.item.p);
  //     setNewCategory(props.item.name);
  //   }
  // }, [props.clickP, props.item]);

  const initialValues = {
    categoryName: props.item?.name || '',
    imageFile: props.item?.src || '',
    pText: props.item?.p || '',
  };

 
  const myForm = useFormik({
    initialValues,

    onSubmit: (values) => {
      handleAddOrUpdateCategory();
    },
    validationSchema: yup.object().shape({
    })
  });

  const validationSchema = yup.object().shape({
    categoryName: yup.string().required('Category name is required'),
    imageFile: yup.string().required('Image file is required'),
    pText: yup.string().required('Paragraph text is required'),
  });

  const handleDeleteCategory = () => {
    _dispatch(remuveCategory(selectedCategory));
    props.onHide(); // סגירת המודל
    _dispatch(openModal({ title: "הצלחה", body: `הקטגוריה ${selectedCategory} הוסרה בהצלחה.` }))
    setSelectedCategory("")
  };


  const handleAddCategory2 = () => {
    debugger
    if (props.clickP != "עדכון") {

      if (!newCategory || !imageFile) {
        alert("נא למלא שם קטגוריה ולהעלות תמונה.");
        return;
      }
      const categoryData = {
        name: newCategory,
        image: imageFile, // You might want to handle file uploads differently based on your backend
        p: pText
      };

      setSelectedCategory(newCategory);
      setNewCategory("");
      setImageFile(null);
      _dispatch(addCategoryItem(categoryData));
      props.onHide();
      _dispatch(openModal({ title: "הצלחה", body: `הקטגוריה ${newCategory} נוספה בהצלחה.` }))
    }
    else {
      debugger
      if (!newCategory || !imageFile || props.item?.id === undefined) {
        alert("נא למלא שם קטגוריה ולהעלות תמונה.");
        return;
      }
      const categoryData = {
        id: props.item.id,
        name: newCategory,
        src: imageFile,
        href: props.item.href || "",
        p: pText,
      };

      setSelectedCategory(newCategory);
      setNewCategory("");
      setImageFile(null);
      _dispatch(updateCategory(categoryData));
      props.onHide();
      _dispatch(openModal({ title: "הצלחה", body: `הקטגוריה ${categoryData.name} עודכנה בהצלחה.` }));
      // שינוי ה-URL לאחר עדכון הקטגוריה
      navigate(`/home/category/${categoryData.name}`);
    }

  };


  const handleAddOrUpdateCategory = () => {
    
    if (props.clickP === 'עדכון') {
      const categoryData = {
        id: props.item?.id,
        name: myForm.values.categoryName ,
        src: myForm.values.imageFile,
        href: props.item?.href || "",
        p: myForm.values.pText,
      };

      _dispatch(updateCategory(categoryData));
      _dispatch(openModal({ title: 'הצלחה', body: `הקטגוריה ${categoryData.name} עודכנה בהצלחה.` }));
      navigate(`/home/category/${categoryData.name}`);
    } else {
      if (!myForm.values.categoryName || !myForm.values.imageFile) {
        alert('נא למלא שם קטגוריה ולהעלות תמונה.');
        return;
      }
      const categoryData = {
        name: myForm.values.categoryName,
        image: myForm.values.imageFile,
        p: myForm.values.pText,
      };
      _dispatch(addCategoryItem(categoryData));
      _dispatch(openModal({ title: 'הצלחה', body: `הקטגוריה ${categoryData.name} נוספה בהצלחה.` }));
    }
    myForm.resetForm();
    props.onHide();
  }


  return (
    <div className="popup-overlay">
      {props.display === 1 ? <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton className="text-right">
          <Modal.Title id="contained-modal-title-vcenter" className="text-right">
            הסרת קטגוריה
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="popup-body text-right">
          <Dropdown>
            <Dropdown.Toggle  >
              בחר קטגוריה
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {categories.map((category: any, index: any) => (
                <Dropdown.Item key={index} onClick={() => setSelectedCategory(category)}>
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>

        <Modal.Footer className="popup-footer">
          <Button onClick={props.onHide}>ביטול</Button>
          <Button onClick={handleDeleteCategory}>{props.clickP} </Button>
        </Modal.Footer>
      </Modal> :
        <Modal show={props.show} onHide={props.onHide} centered>
          <Modal.Header closeButton className="text-right">
            <Modal.Title id="contained-modal-title-vcenter" className="text-right">
              {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="popup-body text-right">

            <form onSubmit={myForm.handleSubmit}>
              <div className="form-group mt-3">
                <input
                  className="addCategory form-control"
                  placeholder="שם קטגוריה"
                  name="categoryName"
                  value={myForm.values.categoryName}
                  onChange={myForm.handleChange}
                />
                {myForm.errors.categoryName && myForm.touched.categoryName ? (
                  <small className="errors text-danger">{myForm.errors.categoryName}</small>
                ) : null}
              </div>
              <div className="form-group mt-3">
                <textarea
                  className="addCategory form-control"
                  placeholder="הזן פרטי קטגוריה"
                  name="pText"
                  value={myForm.values.pText}
                  onChange={myForm.handleChange}
                />
                {myForm.errors.pText && myForm.touched.pText ? (
                  <small className="errors text-danger">{myForm.errors.pText}</small>
                ) : null}
              </div>
              <div className="form-group mt-3">
                <input
                  className="addCategory form-control"
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  onChange={(e) => {
                    if (e.target.files) {
                      myForm.setFieldValue('imageFile', URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {myForm.errors.imageFile && myForm.touched.imageFile ? (
                  <small className="errors text-danger">{myForm.errors.imageFile}</small>
                ) : null}
              </div>
              <div className="mt-4 d-flex justify-content-end">
                <Button type="button" className="btn btn-primary m-1" onClick={props.onHide}>
                  ביטול
                </Button>
                <Button type="submit" className="btn btn-primary  m-1">
                  {props.clickP}
                </Button>
              </div>
            </form>

          </Modal.Body>

        </Modal>
      }
    </div >

  );

};

export default Popup;
