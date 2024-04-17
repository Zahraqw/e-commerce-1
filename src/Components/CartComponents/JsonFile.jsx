import { useSelector,FontAwesomeIcon } from '../../Constants';
import exportFromJSON from 'export-from-json';

const JsonFile = () => {
  const cart = useSelector((state) => state.cart);
  const onExportLocal = () => {
    const data = cart.cartItems.map(item => ({
      ProductName: item.name,
      Price: item.price,
      Quantity: item.cartQuantity,
      TotalPrice: item.price * item.cartQuantity,
    }));
    const fileName = 'myCart'
    const exportType = exportFromJSON.types.csv
    exportFromJSON({ data, fileName, exportType })
  }
  return (
    <FontAwesomeIcon className="csv" onClick={onExportLocal} title="CSV version of your cart (for import into Excel, etc.)" icon="fa-solid fa-file-csv" />
  )
}

export default JsonFile
