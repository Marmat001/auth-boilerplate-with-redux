import React from 'react'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table'

const InvoicePDF = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          {new Date().toLocaleString()}
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>Tourify</Text>
        <Text style={styles.subtitle}>Order Summary</Text>
        <Table
          data={[
            {
              tour: order.tour.title,
              price: order.paymentIntent.amount * 0.01,
              duration: order.tour.duration,
              country: order.country,
              startDate: order.tour.startDate,
            },
          ]}
        >
          <TableHeader>
            <TableCell>Tour</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Start Date</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell getContent={(t) => t.tour} />
            <DataTableCell getContent={(t) => t.country} />
            <DataTableCell getContent={(t) => `${t.price} $`} />
            <DataTableCell
              getContent={(t) =>
                `${t.duration} ${t.duration < 2 ? 'day' : 'days'}`
              }
            />
            <DataTableCell
              getContent={(t) => `${t.startDate.substring(0, 10)}`}
            />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          <Text>
            Date: {'               '}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          {'\n'}
          <Text>
            Order ID: {'         '}
            {order.paymentIntent.id}
          </Text>
          {'\n'}
          <Text>
            Order Status: {'  '}
            {order.orderStatus}
          </Text>
          {'\n'}
          <Text>
            Total Paid: {'       '}
            {order.paymentIntent.amount * 0.01} $
          </Text>
        </Text>
        <Text style={styles.footer}>
          {' '}
          Thank you for traveling the world with us{' '}
        </Text>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export default InvoicePDF
