import { Skeleton, Card } from 'antd'

const LoaderCard = ({ amount }) => {
  const cards = () => {
    const cardAmount = []

    for (let i = 0; i < amount; i++) {
      cardAmount.push(
        <Card key={i} className='col-md-4' style={{ height: '420px' }}>
          <Skeleton active />
        </Card>
      )
    }
    return cardAmount
  }
  return <div className='row pb-5'> {cards()}</div>
}

export default LoaderCard
