import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { InvoiceData } from '../types/invoice';

// Register fonts if needed, using standard fonts for now
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
  ]
});

// Create styles matching the provided PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
    fontSize: 10,
    color: '#000000',
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  headerLeft: {
    flexDirection: 'column'
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 5,
    fontFamily: 'Open Sans'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 10
  },
  contactInfo: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    objectFit: 'cover'
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  clientBox: {
    backgroundColor: '#f28e1c',
    padding: 15,
    borderRadius: 5,
    width: '48%',
    color: '#000'
  },
  clientRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  clientLabel: {
    width: 60,
    fontWeight: 700
  },
  clientValue: {
    flex: 1
  },
  detailsBoxContainer: {
    width: '48%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  detailBox: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    marginBottom: '4%'
  },
  detailLabel: {
    fontWeight: 600,
    marginBottom: 5
  },
  table: {
    width: '100%',
    marginBottom: 20
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: 8,
    borderRadius: 4,
    marginBottom: 5,
    fontSize: 9,
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'dashed',
    alignItems: 'center'
  },
  tableRowAlternate: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'dashed',
    alignItems: 'center'
  },
  colDate: { width: '15%' },
  colDesc: { width: '40%' },
  colQty: { width: '10%', textAlign: 'center' },
  colPrice: { width: '10%', textAlign: 'right' },
  colDiscount: { width: '10%', textAlign: 'right' },
  colTotalRow: { width: '15%', textAlign: 'right', fontWeight: 700 },
  colTotalRowBg: {
    width: '15%',
    backgroundColor: '#000',
    color: '#fff',
    padding: 8,
    textAlign: 'center',
    borderRadius: 4
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  totalLabel: {
    fontSize: 12,
    marginRight: 10
  },
  totalBox: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 700
  },
  footerTopBorder: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    marginBottom: 10
  },
  conditionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontSize: 9
  },
  conditionCol: {
    width: '48%'
  },
  conditionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 8
  },
  conditionText: {
    marginBottom: 5,
    lineHeight: 1.4
  },
  bold: {
    fontWeight: 700
  },
  paymentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontSize: 8,
    color: '#555'
  },
  paymentTitle: {
    marginBottom: 5,
    color: '#999'
  },
  paymentBox: {
    width: '48%'
  },
  paymentNetwork: {
    color: '#f28e1c',
    fontWeight: 700,
    marginBottom: 2
  },
  paymentNetworkMtn: {
    color: '#f6d365', // approximate yellow
    fontWeight: 700,
    marginBottom: 2
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e6e6e6',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerLogo: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  footerText: {
    fontSize: 9,
    color: '#666'
  }
});

const formatNumber = (num: number) => {
  return num.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
};

interface Props {
  data: InvoiceData;
}

export const InvoicePDF: React.FC<Props> = ({ data }) => {
  const totalAmount = data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice) - item.discount, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Proforma</Text>
            <Text style={styles.subtitle}>{data.sender.name} - {data.sender.contactName}</Text>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.contactInfo}>{data.sender.address}</Text>
              <Text style={styles.contactInfo}>{data.sender.email}</Text>
            </View>
          </View>
          <View>
            <Image src="/assets/profile.jpg" style={styles.profilePic} />
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.clientBox}>
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Facturé à :</Text>
              <Text style={styles.clientValue}>{data.client.name}</Text>
            </View>
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Nom :</Text>
              <Text style={styles.clientValue}>{data.client.name}</Text>
            </View>
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Contact :</Text>
              <Text style={styles.clientValue}>{data.client.contact}</Text>
            </View>
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Adresse :</Text>
              <Text style={styles.clientValue}>{data.client.address} {data.client.country}</Text>
            </View>
          </View>

          <View style={styles.detailsBoxContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Date de proforma :</Text>
              <Text>{data.details.issueDate}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Date D'expiration :</Text>
              <Text>{data.details.expiryDate}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>No Proforma :</Text>
              <Text>{data.details.proformaNumber}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Termes de paiement :</Text>
              <Text>{data.details.paymentTerms}</Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.colDate}>DATE</Text>
            <Text style={styles.colDesc}>LES PRESTATIONS DE L'OFFRE</Text>
            <Text style={styles.colQty}>QTE</Text>
            <Text style={styles.colPrice}>P.U (XAF)</Text>
            <Text style={styles.colDiscount}>REMISE (XAF)</Text>
            <Text style={{ width: '15%', textAlign: 'center' }}>MONTANT</Text>
          </View>

          {data.items.map((item, index) => {
            const amount = (item.quantity * item.unitPrice) - item.discount;
            return (
              <View key={item.id} style={index % 2 === 0 ? styles.tableRowAlternate : styles.tableRow}>
                <Text style={styles.colDate}>{item.date}</Text>
                <Text style={styles.colDesc}>{item.description}</Text>
                <Text style={styles.colQty}>0{item.quantity}</Text>
                <Text style={styles.colPrice}>{formatNumber(item.unitPrice)}</Text>
                <Text style={styles.colDiscount}>{formatNumber(item.discount)}</Text>
                <View style={styles.colTotalRowBg}>
                  <Text>XAF {formatNumber(amount)}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Total Section */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total :</Text>
          <View style={styles.totalBox}>
            <Text>XAF {formatNumber(totalAmount).replace(',000', '.000')}</Text>
          </View>
        </View>

        <View style={styles.footerTopBorder}></View>

        {/* Conditions Section */}
        <View style={styles.conditionsSection}>
          <View style={styles.conditionCol}>
            <Text style={styles.conditionTitle}>Conditions de paiement et de prestation</Text>
            <Text style={styles.conditionText}><Text style={styles.bold}>Modifications : </Text>Le client bénéficie de 02 modifications incluses. Toute modification supplémentaire sera facturée XXXX FCFA.</Text>
            <Text style={styles.conditionText}><Text style={styles.bold}>Livrables : </Text>Fichiers HD (PDF, PNG, JPEG), versions imprimables et numériques, ainsi que des mockups.</Text>
            <Text style={styles.conditionText}><Text style={styles.bold}>Paiement : </Text>Un acompte de 50% est requis avant le début du projet. Le solde devra être réglé avant la livraison finale des fichiers.</Text>
          </View>
          <View style={styles.conditionCol}>
            <Text style={styles.conditionTitle}>Délais :</Text>
            <Text style={styles.conditionText}><Text style={styles.bold}>Maquette initiale : </Text>sous 5 jours ouvrables après réception de l'acompte.</Text>
            <Text style={styles.conditionText}><Text style={styles.bold}>Modifications : </Text>sous 2 jours ouvrables après chaque retour du client.</Text>
            <Text style={styles.conditionText}><Text style={styles.bold}>Livraison finale : </Text>sous 2 jours ouvrables après validation et paiement final.</Text>
            <Text style={{ ...styles.conditionText, textDecoration: 'underline' }}>Le concepteur reste propriétaire de la signature de ses créations, mais avec possibilité de cession sur accord mutuel négocié avec le client.</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentBox}>
             <Text style={styles.paymentTitle}>Détails de paiement - BENIN :</Text>
             <Text style={styles.paymentNetwork}>MOOV MONEY</Text>
             <Text>Noms du compte: {data.sender.moov.accountName}</Text>
             <Text>Numéro du compte : {data.sender.moov.accountNumber}</Text>
          </View>
          <View style={styles.paymentBox}>
             <Text style={styles.paymentTitle}> </Text>
             <Text style={styles.paymentNetworkMtn}>MTN MOBILE MONEY</Text>
             <Text>Noms du compte: {data.sender.mtn.accountName}</Text>
             <Text>Numéro du compte: {data.sender.mtn.accountNumber}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/* We'll skip image here if Logo isn't strictly necessary, or put text instead */}
          <Text style={styles.footerText}>{data.sender.name} by {data.sender.contactName}</Text>
          <Text style={{ ...styles.footerText, marginLeft: 10 }}>IFU: {data.sender.ifu} | RCCM: {data.sender.rccm}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default InvoicePDF;
