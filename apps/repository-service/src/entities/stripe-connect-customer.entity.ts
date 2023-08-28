import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import DonationReceiver from './donation-receiver.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('stripe_connect_customer')
class StripeConnectCustomerEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public uid: string;

    @Column()
    public customerId: string;

    @ManyToOne(() => User, (user: User) => user.stripeConnectCustomers)
    @JoinColumn()
    public user: User

    @ManyToOne(() => DonationReceiver, (donationReceiver) => donationReceiver.stripeConnectCustomers)
    @JoinColumn()
    public donationReceiver: DonationReceiver
}

export default StripeConnectCustomerEntity;