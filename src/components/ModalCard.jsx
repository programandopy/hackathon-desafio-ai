import style from "./ModalCard.module.css";
import { HiLocationMarker } from "react-icons/hi";

const ModalCard = ({ data }) => {
  const { key, type, description, address } = data;
  return (
    <div className={style.modal_card_marker}>
      <div className={style.modal_card_content}>
        {/* <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src="https://dummyimage.com/720x400"
          alt="blog"
        /> */}
        <h2 className={style.modal_card_type}>{type}</h2>
        <h1 className={style.modal_card_title}>
          {key}
          <p className={style.modal_card_address}>
            <HiLocationMarker />
            {address}
          </p>
        </h1>
        <p className={style.modal_card_description}>{description}</p>
      </div>
    </div>
  );
};

export default ModalCard;
