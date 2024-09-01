import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

import ImageGallery from "@components/ImageGallery/ImageGallery";
import SearchBar from "@components/SearchBar/SearchBar";
import Loader from "@components/Loader/Loader";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import { sanitizeString } from "./utils/string-utils.js";
import { imageRequest } from "./requests/unsplash-request-helper.js";
import LoadMoreBtn from "@components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "@components/ImageModal/ImageModal";
import {MODAL_HIDDEN_STATUS, MODAL_UNSET_STATUS, PAGE_LIMIT} from "./constants";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationPage, setPaginationPage] = useState(1);
  const [imageItems, setImageItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoadingStatus] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState(false);

  const imgSearchHandler = (submittedQuery) => {
    const searchQuery = sanitizeString(submittedQuery);
    setImageItems([]);
    setPaginationPage(1);
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      try {
        setError(false);
        setLoadingStatus(true);
        const data = await imageRequest({
          query: searchQuery,
          page: paginationPage,
          per_page: PAGE_LIMIT,
        });
        setImageItems((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        setError(true);
      } finally {
        setLoadingStatus(false);
      }
    };
    fetchData();
  }, [searchQuery, paginationPage]);

  useEffect(() => {
    if (imageItems.length > 0 && paginationPage < totalPages) {
      setLoadMore(true);
    } else {
      setLoadMore(false);
    }
  }, [paginationPage, totalPages, imageItems]);

  const loadMoreHandler = async () => {
    setPaginationPage((prev) => prev + 1);
  };

  function closeModal() {
    setModalIsOpen(false);
    setSelectedImg(null);
  }

  function openModal(e) {
    setSelectedImg({
      urls: { regular: e.target.dataset.regularUrl },
      alt_description: e.target.alt,
      likes: e.target.dataset.likes,
      user: { name: e.target.dataset.username },
    });
    setModalIsOpen(true);
  }

  useEffect(() => {
    document.body.style.overflow = modalIsOpen ? MODAL_HIDDEN_STATUS : MODAL_UNSET_STATUS;
  }, [modalIsOpen]);

  return (
    <div>
      <Toaster />
      {
        <ImageModal
          modalIsOpen={modalIsOpen}
          onClose={closeModal}
          image={selectedImg}
        />
      }
      <SearchBar searchHandler={imgSearchHandler} />
      {error && <ErrorMessage />}
      <ImageGallery imageItems={imageItems} clickHandler={openModal} />
      {loading && <Loader />}
      {loadMore && <LoadMoreBtn loadMoreHandler={loadMoreHandler} />}
    </div>
  );
};

export default App;
