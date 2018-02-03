//@flow
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import * as Font from '../constants/Font'
import * as Color from '../constants/Color'

type Props = {
  disabled?: boolean,
  values: Array<any>,
  onChange: () => void,
  selectedIndex?: number,
  buttonStyle?: any,
  labelStyle?: any,
}

export default class SegmentedControl extends Component {
  props: Props

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: props.selectedIndex || 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== undefined) {
      this.setState({selectedIndex: nextProps.selectedIndex})
    }
  }

  onChange = (selectedIndex) => {
    this.setState({selectedIndex})
    if ('function' === typeof this.props.onChange) {
      this.props.onChange(selectedIndex)
    }
  }

  renderButton = (value, index) => {
    const {disabled, buttonStyle, labelStyle} = this.props
    const {selectedIndex} = this.state

    const Container = disabled ? View : TouchableOpacity
    const containerStyle = [styles.segmentButton, buttonStyle]
    const _labelStyle = [styles.segmentLabel, labelStyle]

    if (index === selectedIndex) {
      containerStyle.push(styles.segmentButtonActive)
      _labelStyle.push(styles.segmentLabelActive)
    }

    return (
        <Container style={containerStyle} key={value}
                   onPress={this.onChange.bind(this, index)}>
          <Text style={_labelStyle}>
            {value}
          </Text>
        </Container>
    )
  }

  render() {
    const {values} = this.props

    return (
        <View style={styles.segmentedControl}>
          {values.map(this.renderButton)}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  segmentedControl: {
    backgroundColor: Color.TAB_BACKGROUND_COLOR,
    borderWidth: 0,
    borderColor: Color.CONTRAST_COLOR,
    borderRadius: 2.5,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  segmentButton: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderBottomColor: Color.WHITE,
    borderTopColor: Color.WHITE,
  },
  segmentButtonActive: {
    backgroundColor: Color.TAB_BACKGROUND_COLOR,
    borderBottomWidth: 2.5,
    borderTopWidth: 1,
    borderBottomColor: Color.BTN_COLOR,
    borderTopColor: Color.WHITE,
  },
  segmentLabel: {
    color: Color.SEG_COLOR,
    textAlign: 'center',
    fontSize: 16,
    ...Font.FONT_LIGHT,
  },
  segmentLabelActive: {
    color: Color.BTN_COLOR,
  },
})
