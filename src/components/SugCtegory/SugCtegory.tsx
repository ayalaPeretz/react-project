import React, { useState } from 'react';
import './SugCtegory.scss';
import { Item } from '../../models/Item.model';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Popup from '../Popup/Popup';

interface SugCtegoryProps {
 
}

const SugCtegory = (props:SugCtegoryProps) => {
  const { categoryI } = useParams<{ categoryI: string }>();
  const items: Item[] = useSelector((state:any) => state.categorySlice.items);
  const [modalShow, setModalShow] = React.useState(false);
  const [num, setNum] = useState<number>(2);
  const [title, setTitle] = useState<string>("עריכת פרטי קטגוריה");  

  const item: Item | undefined = items.find(item => item.name === categoryI);

  if (!item) {
    return <div>Item not found</div>;
  }

  const openPopup = () => {
    setModalShow(true)
  };
  const closePopup = () => {
    setModalShow(false)
  };


  return(<div>
  <div className="row">
    <div className="col-md-6">
      <div className="item2">
        <img src={item.src} alt={item.name} className="img-fluid" />
        <h3 className="category-title">
          <span>{item.name}</span>
        </h3>
      </div>
    </div>
    <div className="col-md-6">
      <div className="details">
       <div>{item.p}</div> 
        <Button className='dButton' onClick={openPopup} >עדכון פרטים</Button>
      </div>
    </div>
  </div>
  <Popup
        show={modalShow}
        onHide={closePopup}
        display={num}
        title={title}
        clickP="עדכון"
        item={item}
      />
</div>);
};
  


export default SugCtegory;
