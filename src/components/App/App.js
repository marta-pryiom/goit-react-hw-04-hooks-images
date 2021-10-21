import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { getImages } from '../../Service';
import Container from '../Container';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [largeImage, setLargeImage] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchItem === '') {
      return;
    }
    setLoading(true);
    const fetchSearchItem = () => {
      getImages(searchItem, page)
        .then(images => {
          setImages(prev => [...prev, ...images]);
          if (page !== 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    };

    fetchSearchItem();
  }, [page, searchItem]);

  const handleFormSubmit = searchItem => {
    setSearchItem(searchItem);
    setPage(1);
    setImages([]);
  };
  const handleBtnLoadMoreClick = fetchSearchItem => {
    setLoading(true);
    setPage(prev => prev + 1);
    setLoading(false);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
  };
  const onOpenImageClick = largeImage => {
    setLoading(true);
    setLargeImage(largeImage);
    toggleModal();
    setLoading(false);

    // this.setState({
    //   loading: true,
    //   largeImage,
    // });
    // console.log(this.state.largeImage);
    // this.toggleModal();
    // this.setState({ loading: false });
  };

  return (
    <Container>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length !== 0 ? (
        <ImageGallery images={images} onModalClick={onOpenImageClick} />
      ) : (
        searchItem !== '' && <h1>Nothing was found</h1>
      )}
      {loading && <Loader />}
      {images.length > 0 && <Button onClick={handleBtnLoadMoreClick} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          {loading && <Loader />}
          <img
            src={largeImage.largeImageURL}
            alt={largeImage.tags}
            onClose={toggleModal}
          />
        </Modal>
      )}
    </Container>
  );
}
