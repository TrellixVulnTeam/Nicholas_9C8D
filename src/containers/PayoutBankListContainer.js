import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native'
import * as Color from '../constants/Color'
import ButtonNavigate from '../components/ButtonNavigate'
import Divider from '../components/Divider'
import { connect } from 'react-redux'
import { getBankAccounts } from '../redux/selectors/index'
import * as Font from '../constants/Font'
import type { StripeBankAccount, UserBankAccount } from '../TypeDefinition'

type Props = {
  mode: 'list' | 'checklist',
  selectedCardKey?: string,
  onPressCard: (bank: UserBankAccount) => void,
  renderBottom: any,
  isFetching?: boolean,
  accounts?: Array<StripeBankAccount>
}

@connect((state, ownProps) => PayoutBankListContainer.getStateProps(state, ownProps))
export default class PayoutBankListContainer extends PureComponent {
  props: Props
  static defaultProps = {
    mode: 'list',
    onPressCard: () => undefined,
  }

  static getStateProps(state, ownProps) {
    return {
      accounts: getBankAccounts(state),
      isFetching: state.payouts.isFetching,
    }
  }

  static renderLoader() {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  renderAccount = (account) => {
    const { onPressCard, mode, selectedCardKey } = this.props
    let icon = null

    if (mode === 'checklist' && selectedCardKey === account._key) {
      icon = <Image source={require('../../assets/icons/checkmark.png')}/>
    }

    return (
      <View key={account._key}>
        <Divider/>
        <ButtonNavigate
          renderRight={icon}
          style={styles.btn} onPress={onPressCard.bind(this, account)}>
          <Image style={styles.btnIcon} source={require('../../assets/icons/creditCard.png')}/>
          <Text style={styles.btnLabel}>{account.bank_name}</Text>
        </ButtonNavigate>
        <Divider/>
      </View>
    )
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.isFetching && PayoutBankListContainer.renderLoader()}
        {this.props.accounts.map(this.renderAccount)}
        {typeof this.props.renderBottom === 'function' ? this.props.renderBottom() : this.props.renderBottom}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND_COLOR,
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: 8.5,
    marginLeft: 18.5,
  },
  cardBrand: {
    fontSize: 15,
  },

  btn: {
    paddingLeft: 21,
  },
  btnIcon: {
    marginRight: 12.5,
  },
  btnLabel: {
    color: Color.CONTRAST_COLOR,
    fontSize: 17.5,
    ...Font.FONT_LIGHT,
    letterSpacing: 0.6,
  },
})