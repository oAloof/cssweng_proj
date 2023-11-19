onClick = { handleClick };

const navigate = useNavigate();

const handleClick = () => {
  navigate(`/order-${item.number}`);
};
