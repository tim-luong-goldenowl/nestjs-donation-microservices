import { Exclude } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import DonationReceiver from './donation-receiver.entity';
import Donation from './donation.entity';
import StripeConnectCustomer from './stripe-connect-customer.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity("user")
class UserEntity {
  @Index()
  @PrimaryGeneratedColumn("uuid")
  public uid: string;
  
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({unique: true})
  public email: string;

  @Column({nullable: true})
  public dob: Date;

  @Column({nullable: true})
  public address: string;

  @Column()
  @Exclude()
  public password: string

  @Column({nullable: true})
  public stripeCustomerId: string

  @Column({nullable: true})
  public avatarUrl: string

  @OneToOne(() => DonationReceiver, (donationReceiver: DonationReceiver) => donationReceiver.user)
  public donationReceiver: DonationReceiver;

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[]

  @OneToMany(() => StripeConnectCustomer, (stripeConnectCustomer) => stripeConnectCustomer.user)
  stripeConnectCustomers: StripeConnectCustomer[]
}

export default UserEntity;