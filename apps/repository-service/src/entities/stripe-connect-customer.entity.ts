import { Column, Entity, Index, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import DonationReceiver from './donation-receiver.entity';

@Entity()
class StripeConnectCustomer {
    @Index()
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public customerId: string;

    @ManyToOne(() => User, (user: User) => user.stripeConnectCustomers)
    public user: User

    @ManyToOne(() => DonationReceiver, (donationReceiver) => donationReceiver.stripeConnectCustomers)
    public donationReceiver: DonationReceiver
}

export default StripeConnectCustomer;