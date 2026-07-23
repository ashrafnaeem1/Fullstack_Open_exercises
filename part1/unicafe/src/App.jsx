import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state

  // prettier-ignore
  const [[bad,     setBad],
         [good,    setGood],
         [neutral, setNeutral]]  
                                =   [useState(0),
                                     useState(0),
                                     useState(0)];
  // prettier-ignore
  const feedback = {
    "bad":     {"value": bad,     "setValue": setBad    },
    "good":    {"value": good,    "setValue": setGood   },
    "neutral": {"value": neutral, "setValue": setNeutral}
  };

  return (
    <>
      <Header heading="give feedback" />

      <Form feedback={feedback} />
      <Statistics feedback={feedback} />
    </>
  );
};

const Header = ({ heading }) => <h1>{heading}</h1>;
const Form = ({ feedback }) => {
  const handleSubmit = (event) => event.preventDefault();
  return (
    <form onSubmit={handleSubmit} id="feedbackForm">
      <Button response="good" text="good" feedback={feedback} />
      <Button response="neutral" text="neutral" feedback={feedback} />
      <Button response="bad" text="bad" feedback={feedback} />
    </form>
  );
};
const Button = ({ response, text, feedback }) => {
  const onClick = () => {
    feedback[response]["setValue"](feedback[response]["value"] + 1);
  };
  return (
    <button name={response} onClick={onClick}>
      {text}
    </button>
  );
};

const Statistics = ({ feedback }) => {
  const good = feedback["good"]["value"];
  const bad = feedback["bad"]["value"];
  const neutral = feedback["neutral"]["value"];

  const all = good + neutral + bad;
  const avg = all / 3;
  const percent_positive = get_percentage(good, all).toString() + "%";

  return (
    <div>
      <SubHeading heading="Statistics" />
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        /*prettier-ignore*/
        <div id="statTableContainer">
          <table>
            <tbody>
              <StatisticLine text="good"         val={good}            />
              <StatisticLine text="neutral"      val={neutral}         />
              <StatisticLine text="bad"          val={bad}             />
              <StatisticLine text="all"          val={all}             />
              <StatisticLine text="average"      val={avg}             />
              <StatisticLine text="percentage"   val={percent_positive}/>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
const SubHeading = ({ heading }) => <h2>{heading}</h2>;

const get_percentage = (val, total) => (val / total) * 100;

const StatisticLine = ({ text, val }) => {
  return (
    <tr>
      <td>
        <span>{text}</span>
      </td>
      <td>
        <span>{val}</span>
      </td>
    </tr>
  );
};

export default App;
