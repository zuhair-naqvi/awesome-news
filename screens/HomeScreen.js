import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import { getNews } from "../api/abcnews";
import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    newsFeed: {}
  };
  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    const newsFeed = await getNews();
    this.setState({ newsFeed });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { newsFeed } = this.state;
    console.log(newsFeed.items);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            {newsFeed.items &&
              newsFeed.items.length > 0 &&
              newsFeed.items.map((item, index) => {
                return <Text key={`i${index}`}>{item.title}</Text>;
              })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  }
});
