import React from "react";
import {
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  WebView,
  RefreshControl
} from "react-native";
import { getNews } from "../api/abcnews";
import {
  View,
  Card,
  Caption,
  Button,
  Icon,
  Image,
  GridRow,
  ListView,
  ImageBackground,
  Tile,
  Title,
  Subtitle,
  Overlay,
  Divider,
  Lightbox,
  Spinner
} from "@shoutem/ui";
import moment from "moment";

const formatDate = dateStr => moment(dateStr).format("MMM Do YYYY, h:mm:ss a");

const browser = ({ uri }) => {
  return <WebView source={{ uri }} />;
};
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    newsFeed: {},
    refreshing: false
  };
  _isMounted = false;

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    const newsFeed = await getNews();
    this.setState({ newsFeed });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow
    if (index === "0") {
      return (
        <TouchableOpacity key={index}>
          <ImageBackground
            styleName="large"
            source={{ uri: rowData[0].thumbnail }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom" style={styles.heroText}>
                {rowData[0].title}
              </Title>
              <Subtitle
                styleName="sm-gutter-horizontal"
                style={{ fontSize: 8 }}
              >
                {formatDate(rowData[0].pubDate)}
              </Subtitle>
            </Tile>
          </ImageBackground>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

    const cellViews = rowData.map((item, id) => {
      return (
        <TouchableOpacity key={id} styleName="flexible">
          <Lightbox
            renderHeader={close => (
              <TouchableOpacity onPress={close}>
                <Icon name="close" style={styles.closeButton} />
              </TouchableOpacity>
            )}
            renderContent={() => browser({ uri: item.link })}
          >
            <Card styleName="flexible">
              <Image styleName="medium-wide" source={{ uri: item.thumbnail }} />
              <View styleName="content">
                <Subtitle
                  style={{ fontSize: 10, lineHeight: 12 }}
                  numberOfLines={3}
                >
                  {item.title}
                </Subtitle>
                <View styleName="horizontal">
                  <Caption
                    styleName="collapsible"
                    numberOfLines={2}
                    style={{ fontSize: 6 }}
                  >
                    {formatDate(item.pubDate)}
                  </Caption>
                </View>
              </View>
            </Card>
          </Lightbox>
        </TouchableOpacity>
      );
    });

    return <GridRow columns={2}>{cellViews}</GridRow>;
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
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15
  },
  itemTitle: {
    fontSize: 8
  },
  closeButton: {
    alignSelf: "flex-end",
    color: "#FFF",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    padding: 10
  }
});
