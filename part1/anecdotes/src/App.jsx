import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length));
  };

  const handleVote = () => {
    const votes_copy = [...votes];
    votes_copy[selected] += 1;
    setVotes(votes_copy);
  };

  const handleSubmitPreventFormReset = (e) => e.preventDefault();

  const highest = Math.max(...votes);
  const most_voted_anecdote = anecdotes[votes.indexOf(highest)];

  return (
    <>
      <div id="anecdote_of_the_day">
        <Heading text="Anecdote of the day" />
        <p>{anecdotes[selected]}</p>
        <p>Has {votes[selected]} votes.</p>
      </div>

      <form onSubmit={handleSubmitPreventFormReset} id="vote_and_move_to_next">
        <Button text="vote" onClick={handleVote} />
        <Button text="Next anecdote" onClick={handleNextAnecdote} />
      </form>

      <div id="most_voted_anecdote">
        <Heading text="Anecdote with most votes" />
        <p>{most_voted_anecdote}</p>
        <p>Has {highest} votes</p>
      </div>
    </>
  );
};
const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

export default App;
