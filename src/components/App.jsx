import {useState, useEffect} from "react";
import  Searchbar  from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import  Modal  from "./Modal/Modal";
import { getData } from "./api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Toaster } from 'react-hot-toast';

export default function App(){

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [imagesList, setImagesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isVisiblBtn, setIsVisiblBtn] = useState(false)
  const [ClickImage, setClickImage] = useState(null)

  const onClickImage = (selectedImageURL) => {
    setClickImage(selectedImageURL)
  }

  useEffect(() => {getImages(query, page)}, [query, page])

  
  const getImages = async(query, page) => {
    if(page !== 1 || query !== ''){
      try {
        setIsLoading(true)
        const { totalHits, hits } = await getData(query, page);
        if(hits.length === 0){
          setIsEmpty(true)
          return
        }
        setImagesList(prevSatate => [...imagesList, ...hits])
        setIsVisiblBtn(page < Math.ceil(totalHits / 12))
      }
        catch (error) {console.log(error)} finally {setIsLoading(false)}
    }
    }

  const onCloseModal = () => {
    setClickImage(null)
  }

  const onLoadMore = () => {
    setPage(page + 1)
  }  

  const handleSubmit = query => {
    if (query === '') {
      setQuery('');
      setImagesList([]);
      setPage(1);
    } else {
      setQuery(query);
      setImagesList([]);
      setPage(1);
    }
  }  
  

  return (
    <>
    <Searchbar onSubmit={handleSubmit}/>
    <Toaster />
    {isLoading && <Loader />}
    <ImageGallery imagesList={imagesList} onClick={onClickImage}/>
    {ClickImage && <Modal largeImageURL={ClickImage} modalClose={onCloseModal} />}
    {isEmpty && <h1>Sorry... There are not images</h1>}
    {isVisiblBtn && <Button onClick={onLoadMore}/>}
    </>
  )

}