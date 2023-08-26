import { Column, Entity, Index, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import DonationReceiver from './donation-receiver.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
class StripeConnectCustomer {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public uid: string;
    
    @Column()
    public customerId: string;

    @ManyToOne(() => User, (user: User) => user.stripeConnectCustomers)
    public user: User

    @ManyToOne(() => DonationReceiver, (donationReceiver) => donationReceiver.stripeConnectCustomers)
    public donationReceiver: DonationReceiver
}

export default StripeConnectCustomer;