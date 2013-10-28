class User < ActiveRecord::Base
  devise :database_authenticatable, :lockable, :omniauthable, :registerable,
        :recoverable, :rememberable, :trackable, :validatable

  has_many :relationships, :foreign_key => 'follower_id', :dependent => :destroy
  has_many :followed_users, :through => :relationships, :source => :followed

  has_many :reverse_relationships, :foreign_key => 'followed_id', :class_name => 'Relationship', :dependent => :destroy
  has_many :followers, :through => :reverse_relationships, :source => :follower

  has_many :endorsements, :dependent => :destroy
  has_many :establishments, :through => :endorsements

  def following?(user)
    relationships.where(:followed_id => user.id).count > 0
  end

  def follow!(user)
    relationships.create!(:followed_id => user.id)
  end

  def unfollow!(user)
    relationships.where(:followed_id => user.id).first.try(:destroy)
  end

  def endorsing?(establishment)
    endorsements.where(:establishment_id => establishment.id).count > 0
  end

  def endorse!(establishment)
    endorsements.create!(:establishment_id => establishment.id)
  end

  def unendorse!(establishment)
    endorsements.where(:establishment_id => establishment.id).first.try(:destroy)
  end
end
