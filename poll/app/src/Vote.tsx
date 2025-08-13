import React, { useState } from "react";
import "./App.css";
import { Poll } from "@poll/model";
import { vote } from "./PollClient";
import VoteForm from "./VoteForm";
import { useLocation } from 'react-router-dom';

const Vote = ({ poll }: { poll: Poll }) => {
  const [voteProvided, setVoteProvided] = useState(false);
  const location = useLocation();
  const pollId = location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const voted = (option: number) => {
    vote(pollId, option).then(_ => setVoteProvided(true));
  };

  return (
    <div className="container App">
      {poll ? (
        voteProvided ? (
          <div>Thank you!</div>
        ) : (
          <VoteForm poll={poll} vote={voted} />
        )
      ) : (
        <div>Retrieving poll...</div>
      )}
    </div>
  );
};

export default Vote;
