import React from "react";
import {
  View,
  Card,
  Subtitle,
  Caption,
  Button,
  Icon,
  Image
} from "@shoutem/ui";

const NewsCard = props => {
  return (
    <Card styleName="rounded-corners stretch">
      <Image
        styleName="medium-wide"
        source={{
          uri: "https://shoutem.github.io/img/ui-toolkit/examples/image-12.png"
        }}
      />
      <View styleName="content">
        <Subtitle>Choosing The Right Boutique Hotel For You</Subtitle>
        <View styleName="horizontal v-center space-between">
          <Caption>21 hours ago</Caption>
          <Button styleName="tight clear">
            <Icon name="add-event" />
          </Button>
        </View>
      </View>
    </Card>
  );
};

export { NewsCard };
