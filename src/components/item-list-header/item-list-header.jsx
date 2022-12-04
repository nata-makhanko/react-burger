import PropTypes from "prop-types";

const ItemListHeader = ({ value, isSelectedValue, children }) => {
  let defaultClazzText = "text text_type_main-default ml-2";
  return (
    <>
      {children}
      <p
        className={
          isSelectedValue
            ? defaultClazzText
            : `${defaultClazzText} text_color_inactive`
        }
      >
        {value}
      </p>
    </>
  );
};

ItemListHeader.propTypes = {
  value: PropTypes.string.isRequired,
  isSelectedValue: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};

export default ItemListHeader;
