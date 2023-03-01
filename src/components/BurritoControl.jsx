import React, { useEffect, useState } from "react";
import SpotDetails from "./SpotDetails";
import SpotList from "./SpotList";
import NewSpotForm from "./NewSpotForm";
import NewSalsaForm from "./NewSalsaForm";
import NewRateForm from './NewRateForm';

function BurritoControl() {
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false)
  const [spotList, setSpotList] = useState([]);
  const [salsaPage, setSalsaPage] = useState(false);
  const [reviewPage, setReviewPage] = useState(false);

  useEffect(() => {
    async function getSpotList() {
      return new Promise((resolve, reject) => {
        fetch("/api/Spot", {
          "method": "GET"
        }).then((res) => {
          res.json()
            .then((jres) => {
              setSpotList(jres)
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        })
          .catch((err) => {
            reject(err)
          })
      });
    }
    getSpotList()
  }, [])

  const handleClick = () => {
    if (selectedSpot != null) {
      setSelectedSpot(null);
      setFormVisibleOnPage(false);
      setReviewPage(false);
      setSalsaPage(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage)
    }
  }

  const handleSpotSelection = (id) => {
    const selection = spotList.filter(spot => spot.spotId === id)[0];
    setSelectedSpot(selection);
  }

  const handleAddingNewSpotToList = (spotData) => {
    setFormVisibleOnPage(false);
    setSpotList(spotData);
  }

  const handleReviewClick = () => {
    setReviewPage(true);
  }

  const handleSalsaClick = () => {
    setSalsaPage(true);
  }

  let currVisibleState = null;
  let buttonText = null;

  if (reviewPage) {
    currVisibleState = <NewRateForm 
    spot={selectedSpot}
    />
    buttonText="Return to Spot List!"
  } else if (salsaPage) {
    currVisibleState = <NewSalsaForm
    spot={selectedSpot}
    />
    buttonText="Return to Spot List!"
  }
  else if (selectedSpot !== null) {
    currVisibleState = <SpotDetails
    spot={selectedSpot}
    onClickingReview={handleReviewClick}
    onClickingSalsa={handleSalsaClick}
    />
    buttonText = "Return to Spot List!";
  } else if (formVisibleOnPage) {
    currVisibleState = <NewSpotForm
      onNewSpotCreation={handleAddingNewSpotToList}
      onClick={handleClick}
    />
    buttonText = "Return to Spot List!";
  } else {
    currVisibleState = <SpotList
      onSpotSelection={handleSpotSelection}
      setSpots={spotList}
    />
    buttonText = "Add a Spot!";
  }

  return (
    <React.Fragment>
      {currVisibleState}
      <button className="bg-red-300 rounded p-1" onClick={handleClick}>{buttonText}</button>
    </React.Fragment>
  )

}

export default BurritoControl;