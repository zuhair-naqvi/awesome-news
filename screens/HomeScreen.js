import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl
} from "react-native";
import { getNews } from "../api/abcnews";
import {
  View,
  Card,
  Caption,
  Image,
  GridRow,
  ListView,
  ImageBackground,
  Tile,
  Title,
  Subtitle,
  Divider,
  Spinner
} from "@shoutem/ui";
import moment from "moment";

const formatDate = dateStr => moment(dateStr).format("MMM Do YYYY, h:mm a");

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    newsFeed: {},
    refreshing: true
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    const newsFeed = await getNews();
    this.setState({ newsFeed, refreshing: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { newsFeed, refreshing } = this.state;
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(newsFeed.items, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }
      return 1;
    });

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.body}>
            <ListView data={groupedData} renderRow={this.renderRow} />
          </View>
        </ScrollView>
      </View>
    );
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    const newsFeed = await getNews();
    this.setState({ newsFeed, refreshing: false });
  };

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow
    if (index === "0") {
      const firstItem = rowData[0];
      return (
        <TouchableOpacity
          key={index}
          onPress={() => this._openLink(firstItem.link)}
        >
          <ImageBackground
            styleName="large"
            source={{ uri: firstItem.enclosure && firstItem.enclosure.link }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom" style={styles.heroText}>
                {firstItem.title}
              </Title>
              <Subtitle
                styleName="sm-gutter-horizontal"
                style={{ fontSize: 12 }}
              >
                {formatDate(firstItem.pubDate)}
              </Subtitle>
            </Tile>
          </ImageBackground>

          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

    const cellViews = rowData.map((item, id) => {
      const {
        enclosure: { link }
      } = item;
      return (
        <TouchableOpacity
          key={id}
          styleName="flexible"
          onPress={() => this._openLink(item.link)}
        >
          <Card styleName="flexible">
            <Image styleName="medium-wide" source={{ uri: link }} />
            <View styleName="content">
              <Subtitle
                style={{ fontSize: 16, lineHeight: 18 }}
                numberOfLines={3}
              >
                {item.title}
              </Subtitle>
              <View styleName="horizontal">
                <Caption
                  styleName="collapsible"
                  numberOfLines={2}
                  style={{ fontSize: 12 }}
                >
                  {formatDate(item.pubDate)}
                </Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    return <GridRow columns={2}>{cellViews}</GridRow>;
  }

  _openLink(uri) {
    const { navigation } = this.props;
    navigation.push("Browser", { uri });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0d0d0"
  },
  contentContainer: {},
  body: {
    alignItems: "center",
    marginTop: 2,
    marginBottom: 20
  },
  heroText: {
    fontSize: 24,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15
  },
  itemTitle: {
    fontSize: 16
  }
});
