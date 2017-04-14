//React component that takes in some text as a property and displays it
const Tweet = (props) => (
    <li className="clearfix list-group-item">
	  {props.text}
	  {props.children}
	</li>
);

const Button = (props) => (
	<button
		onClick={props.link}
		className="btn btn-info pull-right"
	>
		{props.label}
	</button>
);

//React component that makes a call to the API in the HomeController. If more than one tweet is returned, it displays a Tweet component for each.
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			recentTweets: [],
			pinnedTweets: [],
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.pin = this.pin.bind(this);
	}

	//React function that runs after the app first loads
	componentDidMount() {
		const recentFetch = fetch('/recentTweets', {method: 'get'})
			.then(response => response.json());

		const pinnedFetch = fetch('/pinnedTweets', {method: 'get'})
			.then(response => response.json());

		Promise.all([recentFetch, pinnedFetch])
			.then((data) => {
				this.setState({recentTweets: data[0], pinnedTweets: data[1]});
			})
			.catch((error) => {
				console.error('Error', error);
			});
	}

	pin(tweet) {
		fetch('/pinTweet', {
			method: 'post',
			headers: new Headers({
				'Content-Type' : 'application/json'
			}),
			body: JSON.stringify(tweet)
		})
		.then((response) => {
			const data = this.state.pinnedTweets;
			data.push(tweet);
			this.setState({pinnedTweets: data});
		})
		.catch((error) => {
			console.error('Error', error);
		});
	}

	//React function that runs on first load and whenever the state is changed
	render() {
		const pinnedTweets = (this.state.pinnedTweets.length > 0) ?
				this.state.pinnedTweets.map(tweet =>
					<Tweet key={tweet.Id} text={tweet.Text} />
				)
			:
				null;

		const recentTweets = (this.state.recentTweets.length > 0) ? 
				this.state.recentTweets.map(tweet =>
						<Tweet key={tweet.Id} text={tweet.Text}>
							<Button link={() => this.pin(tweet)} label="Pin" />
						</Tweet>
				)
			:
				null;

		return (
			<div className="container">
				<h2>Welcome to the Xeromatic!</h2>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Pinned Tweets</h3>
					</div>
					<ul className="list-group">{pinnedTweets}</ul>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Recent Tweets</h3>
					</div>
					<ul className="list-group">{recentTweets}</ul>
				</div>
			</div>
		);
	}
}

//This function will render our App to the page
ReactDOM.render(<App />, document.getElementById('app'));